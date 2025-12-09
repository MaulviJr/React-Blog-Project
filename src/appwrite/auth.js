// import { Client, Account, ID } from "appwrite";
// import conf from "../conf/conf";

// export class AuthService {
//     client = new Client();
//     account;

//     constructor() {
//         this.client = this.client
//             .setEndpoint(conf.appwriteURL) // Your API Endpoint
//             .setProject(conf.appwriteProjectId);
//         this.account = new Account(this.client);
//     }

//     async createAccount({ email, password, name }) {
//         const user = await this.account.create(ID.unique(), { email, password, name });
//         if (user) {
//             return this.login({ email, password }); // Call login here.
//         } else {
//             return user;
//         }
//     }

//     async login({ email, password }) {
//         return await this.account.createEmailPasswordSession({ email, password });
//     }

//     async getLoginStatus() {
//         return await this.account.get();
//     }

//     async logout() {
//         return await this.account.deleteSessions();
//     }
// }




import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client= new Client();
    account;

    constructor() {
        this.client= this.client
        .setEndpoint(conf.appwriteURL) // Your API Endpoint
    .setProject(conf.appwriteProjectId); 
    this.account = new Account(this.client);
}
    async createAccount ({email,password,name}) {
        // eslint-disable-next-line no-useless-catch
        try {
         const user= await this.account.create(
            ID.unique(),email,password,name);
            if (user) {
               return this.login({email,password})
                //call login here.
            }
            else {
                return user;
            }
        } catch (error) {
            throw error
        }
    };
    async login ({email,password}) {
        try {
           const loginUser = await this.account.createEmailPasswordSession
            ({email,password});
            return loginUser
        } catch (error) {
                throw error  ;          
        }
      
    };

    async getLoginStatus() {
        try {
            return await this.account.get()
        } catch (error) {
             return null;
        }

      
    };

    async logout () {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    };
};


const authService=new AuthService();

export default authService;