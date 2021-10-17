# ExpressNodeJs eCommerce MicroService
Expressjs NodeJs eCommerce MicroService Trial


#--Run the following on CI for NodeJs
npm i --save express mongoose body-parser axios nodemon mongoosastic debug if-env dotenv cors jsonwebtoken bcryptjs

#--Pull new Docker Image and map port to local port
Docker pull mongo
#--Start Docker Image

#--Run 
Nodemon Users 
Nodemon Sellers

cd Orders
nodemon Orders


Main Api entry point for Customers is the Users
Main Api entry point for Sellers is the Sellers
both end point will require JWT Token

interneal services like Order / Cart / Product will be used by the main api but hidden to public
