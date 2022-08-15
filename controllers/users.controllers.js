
const db = require('../models/index');
const users = db.users;
const dept=db.dept;
module.exports = {
    getAll: (req, res) => {
        users.findAll({include: {model:dept}}).then((data) => {
            res.send({ error: false, data: data })
        }).catch((err) => {
            res.send({ error: true, message: err.message });
        })
    },
    getDeptWiseUsers: (req, res) => {
        dept.findAll({include: {model:users}}).then((data) => {
            res.send({ error: false, data: data })
        }).catch((err) => {
            res.send({ error: true, message: err.message });
        })
    },
    createUser: (req, res) => {
        let user = {
            Name: req.body.Name,
            Mobile: req.body.Mobile,
            deptID: req.body.DeptID,
        }
        users.create(user).then((data) => {
            res.send({ error: false, message: 'User Created' })
        }).catch((err) => {
            res.send({ error: true, message: err.message });
        })
    },

    updateUser: (req, res) => {
        let id = req.params.id;
        users.update({
            Mobile: req.body.Mobile
        }, { where: { ID: id } }).then((data) => {
            res.send({ error: false, message: 'User Updated' })
        }).catch((err) => {
            res.send({ error: true, message: err.message });
        })
    },
    findUser: (req, res) => {
        let id = req.params.id;
        users.findAll({ where: { ID: id } }).then((data) => {
            res.send({ error: false, data: data })
        }).catch((err) => {
            res.send({ error: true, message: err.message });
        })
    },
    deleteUser: (req, res) => {
        let id = req.params.id;
        users.destroy({ where: { ID: id } }).then((data) => {
            if(data>0){
                res.send({ error: false, message:'User deleted successfully' }); 
            }else{
                res.send({ error: false, message:'User Not Found with ID '+id });
            }
       
        }).catch((err) => {
            res.send({ error: true, message: err.message });
        })
    }
}