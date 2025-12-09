import { Client, TablesDB, Storage, ID, Query } from "appwrite";
import conf from "../conf/conf";

export class Service {
    client = new Client();
    tables;
    storage;


    constructor() {
        this.client = this.client
            .setEndpoint(conf.appwriteURL) // Your API Endpoint
            .setProject(conf.appwriteProjectId);
        this.tables = new TablesDB(this.client);
        this.storage = new Storage(this.client);
    }

async createPost({ title, slug, content, featured_image, status, user_id }) {
    try {
        return await this.tables.createRow({
            databaseId: conf.appwriteDatabaseId,
            tableId: conf.appwriteTablesId,
            rowId: slug, // optional, can use ID.unique() too
            data: {
                title,
                slug,
                content,
                featured_image,
                status,
                user_id,
            },
            // permissions: ["role:all"], // optional, set if needed
        });
    } catch (error) {
        console.error("Error in createPost ::", error);
    }
}

    async editPost(slug, { title, content, featured_image, status }) {
        try {
            return await this.tables.updateRow(
                conf.appwriteDatabaseId, // Database ID
                conf.appwriteTablesId,   // Table ID
                slug,                    // Row ID
                {
                    title,
                    content,
                    featured_image,
                    status,
                }
            );

        } catch (error) {
            console.error("Error in editPost ::", error);
        }
    }

    async deletePost(slug) {
        try {
            return await this.tables.deleteRow(
                conf.appwriteDatabaseId,
                conf.appwriteTablesId,
                slug,
            )
        } catch (error) {
            console.error("Error in deletePost ::", error);
        }
    }

    async getPost(slug) {
        try {
            return await this.tables.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTablesId,
                rowId: slug,
            });
        } catch (error) {
         console.error("Error in getPost ::", error);
        }
    }

    async listPosts(queries) {
        try {
        return await this.tables.listRows({
            databaseId: conf.appwriteDatabaseId,
            tableId: conf.appwriteTablesId,
          queries:  [
                Query.equal("status","active")
            ]
        });
        } catch (error) {
         console.error("Error in getPost ::", error);
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: file,

            })
        } catch (error) {
                     console.error("Error in getPost ::", error);

        }
    }

    async deleteTheFile(fileId) {
        try {
            return await this.storage.deleteFile(
                {
                    bucketId: conf.appwriteBucketId,
                    fileId: fileId,
                }
            )
        } catch (error) {
      console.error("Error in previewFile ::", error);

        }
    }

    previewFile = (fileId) => {
        try {
            
            return this.storage.getFileView({
                bucketId: conf.appwriteBucketId,
                fileId: fileId,
            })
        } catch (error) {
              console.error("Error in delPost ::", error);
        }
    }
 
};

const service = new Service();

export default service;