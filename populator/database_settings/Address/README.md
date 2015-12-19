
# Schema

|  Column Name  |  Data Type  |  Format       |  Default 默认值                   |  Column Notes 列注释  |  Readonly 只读 (Yes or No)  |  Required 必填项 (Yes or No)  |  Hidden from client 客户端不可见 (Yes or No)  |  Auto-Increment 自增  |  Rest Auto-Increment to default value 重置自增 自增值重置为列默认值  |  Notes                      
|---------------|-------------|---------------|----------------------------------|--------------------|---------------------------|----------------------------|-----------------------------------------|---------------------|--------------------------------------------------------|-----------------------------
|  objectId     |  String     |               |  automatically filled by system  |                    |  N/A                      |  N/A                       |  N/A                                    |  N/A                |  N/A                                                   |                             
|  ACL          |  ACL        |               |                                  |                    |  N                        |  Y                         |  N                                      |  N/A                |  N/A                                                   |                             
|  street       |  String     |               |                                  |                    |  N                        |  Y                         |  N                                      |  N/A                |  N/A                                                   |                             
|  region       |  Pointer    |  L_Region     |                                  |                    |  N                        |  Y                         |  N                                      |  N/A                |  N/A                                                   |                             
|  postalCode   |  String     |  Postal Code  |                                  |                    |  N                        |  N                         |  N                                      |  N/A                |  N/A                                                   |  - verify valid postal code 
|  geoLocation  |  GeoPoint   |               |                                  |                    |  Y                        |  Y                         |  N                                      |  N/A                |  N/A                                                   |                             
|  fullAddress  |  String     |               |                                  |                    |  Y                        |  Y                         |  N                                      |  N/A                |  N/A                                                   |  - this is a computed column
|  isActive     |  Bool       |               |  TRUE                            |                    |  Y                        |  Y                         |  Y                                      |  N/A                |  N/A                                                   |                             
|  createdAt    |  Date       |               |                                  |                    |  Y                        |  N                         |  N                                      |  N/A                |  N/A                                                   |                             
|  updatedAt    |  Date       |               |                                  |                    |  Y                        |  N                         |  N                                      |  N/A                |  N/A                                                   |                             

# Indexing

|  索引名称               |  索引键值                     |  索引选项                                             |  
|------------------------|------------------------------|------------------------------------------------------|--
|  geoLocation_2dsphere  |  {"geoLocation":"2dsphere"}  |  {"v":1,"background":true,"2dsphereIndexVersion":2}  |  
|                        |                              |                                                      |  
