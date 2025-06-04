const Role = require("../models/role");

exports.createRole = async(req, res)=>{
    try{
        const{roleName} = req.body;

        if(!roleName){
            return res.status(400).json({message: "Role name is required"});
        }

        const existing = await Role.findOne({where: {roleName}});
        if(existing){
            return res.status(409).json({message:"Role already exists"});
        }

        const role = await Role.create({ roleName });
         res.status(201).json({ message: "Role created successfully", role });
        } catch (error) {
        console.error("Error creating role:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(role);
  } catch (error) {
    console.error("Error fetching role:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { roleName } = req.body;
    const role = await Role.findByPk(req.params.id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    role.roleName = roleName || role.roleName;
    await role.save();

    res.status(200).json({ message: "Role updated successfully", role });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    await role.destroy();
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ message: "Server error" });
  }
};