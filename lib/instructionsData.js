const instructions = `
+--------------------------------------------------------------+
|                 WELCOME TO EMPLOYEE TRACKER                  |
+--------------------------------------------------------------+
****************************************************************
**********             ***************               ***********
**********             ***************               ***********
**********    *****************************     ****************
**********    ***   ***********************     ****************
**********          ***********************     ****************
**********    ***   ***********************     ****************
**********    *****************************     ****************
**********             ********************     ****************
**********             ********************     ****************
****************************************************************
+--------------------------------------------------------------+
|                                                              |
+--------------------------------------------------------------+
|          INSTRUCTIONS FOR SETTING UP YOUR DATABASE           |
+--------------------------------------------------------------+
|  ! The database needs to be initialized before you can add   |
|  ! departments, roles, and employees. If you have not added  |
|  ! your password to the process.env please view instructions |
|                      in the README.                          |
|                                                              |
|  - To initialize the database select 'Initialize Database'   |
|   !! This will exit the program and launch the terminal !!   |
|  - In the console type mysql -u root -p and your password    |
|    then type: source db/schema.sql this will create the      | 
|    the tables for the database. Relaunch E.T. by typing      |
|         node index and proceed to the next step.             |
|                                                              |
+--------------------------------------------------------------+
|   !  Departments Need to be added to the database before     |
|   !              adding roles or employees.                  |
|                                                              |
|  - To add departments, scroll down the list using arrow keys |     
|   -Select 'View Options for Departments' => 'Add Department' |
+--------------------------------------------------------------+
|  !  Now that departments are added you can add Roles to the  |
|   database. Follow the prompts and enter all the information |
|                                                              |
|  - To add roles, scroll down the list using arrow keys       |
|   Select 'View Options for Roles' => 'Add new role...'       |
+--------------------------------------------------------------+
|  !     Almost there, now you can add your employees          |
|                                                              |
|  - To add employees, scroll down Select 'View Options for    |
|            employees' => 'Add an employee'                   |
+--------------------------------------------------------------+

`

module.exports = instructions;