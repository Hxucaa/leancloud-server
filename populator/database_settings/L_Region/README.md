
# Schema

|  Column Name  |  DataType  |  Format  |  Default 默认值                              |  Column Notes 列注释  |  Readonly 只读 (Yes or No)  |  Required 必填项 (Yes or No)  |  Hidden from client 客户端不可见 (Yes or No)  |  Auto-Increment 自增  |  Rest Auto-Increment to default value 重置自增 自增值重置为列默认值  |  Notes
|---------------|------------|----------|---------------------------------------------|----------------------|---------------------------|----------------------------|-----------------------------------------|---------------------|--------------------------------------------------------|-------
|  objectId     |  String    |          |  automatically filled by system             |                      |  N/A                      |  N/A                       |  N/A                                    |  N/A                |  N/A                                                   |       
|  ACL          |  ACL       |          |                                             |                      |  N                        |  Y                         |  N                                      |  N/A                |  N/A                                                   |       
|  code         |  String    |          |                                             |                      |  Y                        |  Y                         |  N                                      |  N/A                |  N/A                                                   |       
|  countryCode  |  String    |          |                                             |                      |  Y                        |  Y                         |  N                                      |  N/A                |  N/A                                                   |       
|  regionNameE  |  String    |          |                                             |                      |  Y                        |  N                         |  N                                      |  N/A                |  N/A                                                   |       
|  regionNameC  |  String    |          |                                             |                      |  Y                        |  Y                         |  N                                      |  N/A                |  N/A                                                   |       
|  level        |  Number    |          |                                             |                      |  Y                        |  Y                         |  N                                      |  N/A                |  N/A                                                   |       
|  upperRegion  |  String    |          |                                             |                      |  Y                        |  Y                         |  N                                      |  N/A                |  N/A                                                   |       
|  createdAt    |  Date      |          |  datetime (automatically filled by system)  |                      |  Y                        |  N                         |  N                                      |  N/A                |  N/A                                                   |       
|  updatedAt    |  Date      |          |  datetime (automatically filled by system)  |                      |  Y                        |  N                         |  N                                      |  N/A                |  N/A                                                   |       


# Indexing

|  索引名称  |   索引键值     |   索引选项                                  |  
|-----------|---------------|-------------------------------------------|--
|  code_1   |  {"code":1}   |  {"v":1,"unique":true,"background":true}  |  
|  code_-1  |  {"code":-1}  |  {"v":1,"unique":true,"background":true}  |  
|           |               |                                           |  

