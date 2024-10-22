import UserModel from "../models/user.model.js";
import {blogs} from "../models/blog.model.js"
export default class UserController {
    getRegister(req, res) {
      res.render('register');
    }
    getLogin(req, res) {
        res.render('login');
      }

      postRegister(req, res){
        const{ name, email, password} = req.body;
        // destructuring
        UserModel.add(name, email, password);
        res.render('login');
      }

      postLogin(req, res){
        const{email, password} = req.body;
        const user =UserModel.isValidUser(
          email,
          password
        );
        if(!user){
          return res.render('login', {
            errorMessage:"Invalid Creds",
          });
        }
        req.session.userEmail = email;
        res.render('blogs', { blogs,  blogs,userEmail: req.session.userEmail } );
      }
      logout(req, res){
        req.session.destroy((err) =>{
          if(err){
            console.log(err);
          }
          else{
            res.redirect('/login')
          }
        });
        res.clearCookie('lastVisit');
      }

  }
  