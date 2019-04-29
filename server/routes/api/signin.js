const User = require('../../models/User')
const UserSession = require('../../models/UserSession')
module.exports = (app) => {
    app.post('/api/account/signup',(req, res, next)=>{
      const obj = new User({
        firstName :req.body.firstName,
        lastName :req.body.lastName,
        email :req.body.email,
        password: req.body.password,
      }) ;

      // obj.password = obj.generateHash(req.body.password)
       
        obj.save()
        .then(saved =>{
          console.log(saved, "saved")
           res.status(201).json({
               message : "Added the user"
           })
        })
    });

    app.post('/api/account/signin',(req, res, next)=>{
      const { body } = req
      const {
        password
      } = body;
      let {
        email
      } = body;
      if (!email){
        return res.send({
          success: false,
          message: 'Error: Email cannot be blank'
        });
      }
      if (!password){
        return res.send({
          success: false,
          message: 'Error: password cannot be blank'
        });
      }
      email = email.toLowerCase();
      User.find({
        email:email
      }, (err, users) => {
        if(err){
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }
          if (users.length != 1){
            console.log("length error")

            return res.send({
              success: false,
              message: 'Error: Invalid'
            });
          
        }
        
        const user = users[0]
        if(!user.validPassword(password))
          return res.send({
                success: false,
                message: 'Error: Invalid password'
              });
       
         
        const obj2 = new UserSession(
          {
            userId : user._id
          }
        );
        
        obj2.save((err, doc) => {
          if(err){
            console.log("save error")
            return res.send({
              success: false,
              message: 'Error: server error'
            });
          }
          return res.send({
            success: true,
            message: 'valid signin',
            token: doc._id
          });
        })
      }
     
      )
  })

  app.get('/api/account/verify',(req, res, next) => {
    const {query} = req;
    const {token} = query;

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions)=>{
        if(err){
          return res.send({
            success:false,
            message: "Error: Sever Error"
          });
        }

        if(sessions.length !=1 ){
          return res.send({
            success:false,
            message: "Error: Invalid"
          });
        }
        else{
          return res.send({
            success:true,
            message: "good"
          });
        }
    });
  })


  app.get('/api/account/logout', (req, res, next) => {
    const { query } = req;
    const { token } = query;
    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Good'
      });
    });
  });
}
   
