// const db = require('../db');

// exports.changeStatusToDone = async (req, res) => {
//   let connection;
//   try {
//     connection = await db.getConnection();
//     await connection.beginTransaction();

//     const { appointment_id } = req.params;
    

//     await connection.commit();
//   } catch (error) {
//     await connection.rollback();
//   }
// };
