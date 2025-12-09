import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {Button,Input,RTE,Select} from '../index.js'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import service from '../../appwrite/config.js'
import { useCallback } from 'react';

function PostForm({post}) {
    
const {register,handleSubmit,watch,setValue,control,getValues,reset}=useForm({
    defaultValues: {
        // title: post?.title || '',
        // slug:post?.slug || '',
        // content: post?.content||'',
        // status: post?.status || 'active',
         title: '',
      slug: '',
      content: '',
      status: 'active',
    }
})

const navigate = useNavigate()
const userData=useSelector(state=>state.auth.userData)

  useEffect(() => { // this will load up content upon reload
    if (post && post.$id) {
      reset({
        title: post.title || '',
        slug: post.slug || '',
        content: post.content || '',
        status: post.status || 'active',
      });
    }
  }, [post, reset]);

const submit = async (data) =>{
    if (post) {
        //handle file first if post exist
        const file=data.image[0] ? 
        service.uploadFile(data.image[0]) : null
        if(file) {
            service.deleteTheFile(post.featured_image)
        }
        //now update data in post
        const dbPost=await service.editPost(post.$id,
            {...data,featured_image:file?file.$id:undefined})
        // we update image because we have it now.
        if (dbPost) {
            navigate(`/post/${dbPost.$id}`)
        }
    } else {
        const file= data.image[0] ? await service.uploadFile(
            data.image[0]) : null;

        if (file) {
            const fileId= file.$id;
            data.featured_image=fileId;
            const dbPost=await service.createPost({
                ...data, // spreadout because there will be never userData
                user_id:userData.$id,

            })

            if (dbPost) {
           navigate(`/post/${dbPost.$id}`)
            }
        }
    }
}       

const slugTransform=useCallback((value)=>{
    if(value && typeof value ==='string') {
        return value
        .trim()
        .toLowerCase()
         .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

        return '';
    }
},[]);

    useEffect(()=>{
        const subscription = watch((value,{name})=>{
                if(name==='title') {
                    setValue('slug',slugTransform(value.title,{shouldValidate:true}))
                }
        })

        return ()=>{
            subscription.unsubscribe()
        }

    },[watch,slugTransform,setValue]);

    return (
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.previewFile(post.featured_image)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;