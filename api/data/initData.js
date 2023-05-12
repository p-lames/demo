const {users, roles, privileges} = require('../models')
module.exports = async function() {
    // Add user
    let adminUser = await users.create({firstName: "P.", lastName:"Lam.", email: "test@test.com", phoneNumber : "+49111222333" });
    let userUser = await users.create({firstName: "Patrick", lastName:"L.", email: "pl@test.com", phoneNumber : "+49111222333" });
    // Add roles
    let adminRole = await roles.create({ roleName: "Admin" });
    let userRole = await roles.create({ roleName: "User" });
    // Add privileg
    let createPrivilege = await privileges.create({ privilegeName: "Create" });
    let readPrivilege = await privileges.create({ privilegeName: "Read" });
    let updatePrivilege = await privileges.create({privilegeName: "Update"});
    let deletePrivilege = await privileges.create({privilegeName: "Delete"});
    // Add roles to a user
    await adminUser.addRoles([adminRole,userRole]);
    await userUser.addRoles([userRole])
    // Add privilege to Role
    await adminRole.addPrivileges([createPrivilege,readPrivilege]);


}