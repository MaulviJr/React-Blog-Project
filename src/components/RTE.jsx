import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import React from 'react';

const RTE = ({name, control,label, defaultValue}) => {
    
    
    return (
        <div>
        {label && <label>{label}</label>}
        <Controller 
            name={name || 'editor'}
            control={control}
            render={({field:{onChange}})=>(
                <Editor 
                apiKey="h28sbws8qt6rdkqj056o0v6w7xevi0daif61yiroag86ku07"
                initialValue={defaultValue || ''}
                init={{
                    height: 400,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic underline | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | link image media | code | help',
                    branding: false,
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
                }}
                onEditorChange={onChange}
                />
            )}
        
        />
               
        </div>
    );
};

export default RTE;