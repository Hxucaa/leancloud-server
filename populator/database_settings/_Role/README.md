
# Schema

|  Column Name  |  DataType  |  Format  |  Default 默认值  |  Column Notes 列注释  |  Readonly 只读 (Yes or No)  |  Required 必填项 (Yes or No)  |  Hidden from client 客户端不可见 (Yes or No)  |  Notes                                                                                                                          
|---------------|------------|----------|---------------|--------------------|---------------------------|----------------------------|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------
|  objectId     |  String    |          |               |                    |  N/A                      |  N/A                       |  N/A                                    |                                                                                                                                 
|  ACL          |  ACL       |          |               |                    |  N                        |  Y                         |  N                                      |                                                                                                                                 
|  name         |  String    |          |               |                    |  N                        |  Y                         |  N                                      |  - Uniqueness ensured by indexing                                                                                               
|  users        |  Relation  |          |               |                    |  N                        |  N                         |  N                                      |                                                                                                                                 
|  roles        |  Relation  |          |               |                    |  N                        |  N                         |  N                                      |                                                                                                                                 
|  isActive     |  Bool      |          |  TRUE         |                    |  N                        |  Y                         |  N                                      |  - this is to state if a role is in use- True: is an active role- False: is an inactive role- By default, it will be set as true
|  createdAt    |  datetime  |          |               |                    |  Y                        |  N                         |  N                                      |                                                                                                                                 
|  updatedAt    |  datetime  |          |               |                    |  Y                        |  N                         |  N                                      |                                                                                                                                 
|               |            |          |               |                    |                           |                            |                                         |                                                                                                                                 

# Indexing

|  索引名称      |   索引键值         |   索引选项                                  
|---------------|-------------------|-----------------------------------------
|  roles.$id_1  |  {"roles.$id":1}  |  {"v":1,"background":true}              
|  name_1       |  {"name":1}       |  {"v":1,"unique":true,"background":true}
|  users.$id_1  |  {"users.$id":1}  |  {"v":1,"background":true}              
|               |                   |                                         

