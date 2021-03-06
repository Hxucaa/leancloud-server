
# Schema

|  Column Name  |  DataType  |  Format   |  Default 默认值                              |  Column Notes 列注释  |  Readonly 只读 (Yes or No)  |  Required 必填项 (Yes or No)  |  Hidden from client 客户端不可见 (Yes or No)  |  Auto-Increment 自增  |  Rest Auto-Increment to default value 重置自增 自增值重置为列默认值  |  Notes
|---------------|------------|-----------|---------------------------------------------|--------------------|---------------------------|----------------------------|-----------------------------------------|---------------------|--------------------------------------------------------|---------------------------
|  objectId     |  String    |           |  automatically filled by system             |                    |  N/A                      |  N/A                       |  N/A                                    |  N/A                |  N/A                                                   |
|  ACL          |  ACL       |           |                                             |                    |  N                        |  Y                         |  N                                      |  N/A                |  N/A                                                   |
|  name         |  String    |           |                                             |                    |  N                        |  Y                         |  N                                      |  N/A                |  N/A                                                   |  - less than 20 characters
|  phone        |  String    |  phone    |                                             |                    |  N                        |  Y                         |  N                                      |  N/A                |  N/A                                                   |
|  email        |  String    |  email    |                                             |                    |  N                        |  N                         |  N                                      |  N/A                |  N/A                                                   |  - valid email address
|  websiteUrl   |  String    |  URL      |                                             |                    |  N                        |  N                         |  N                                      |  N/A                |  N/A                                                   |  - valid URL
|  address      |  Pointer   |  Address  |                                             |                    |  N                        |  Y                         |  N                                      |  N/A                |  N/A                                                   |
|  coverImage   |  AVFile    |           |                                             |                    |  N                        |  Y                         |  N                                      |  N/A                |  N/A                                                   |
|  description  |  String    |           |                                             |                    |  N                        |  Y                         |  N                                      |  N/A                |  N/A                                                   |  - Less than 500 characters
|  isActive     |  Bool      |           |  TRUE                                       |                    |  Y                        |  Y                         |  Y                                      |  N/A                |  N/A                                                   |
|  createdAt    |  Date      |           |  datetime (automatically filled by system)  |                    |  Y                        |  N                         |  N                                      |  N/A                |  N/A                                                   |
|  updatedAt    |  Date      |           |  datetime (automatically filled by system)  |                    |  Y                        |  N                         |  N                                      |  N/A                |  N/A                                                   |
|  aaCount      |  Number    |  Int      |  0.0                                        |                    |  Y                        |  Y                         |  N                                      |  N                  |  N                                                     |
|  treatCount   |  Number    |  Int      |  0.0                                        |                    |  Y                        |  Y                         |  N                                      |  N                  |  N                                                     |
|  toGoCount    |  Number    |  Int      |  0.0                                        |                    |  Y                        |  Y                         |  N                                      |  N                  |  N                                                     |


# Indexing

|  索引名称                     |  索引键值                           |  索引选项
|---------------------------|---------------------------------|----------------------------------------------------

