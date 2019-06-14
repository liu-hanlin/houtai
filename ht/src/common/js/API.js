var baseUrl='/api';
var login=baseUrl+'/login';

var addmanage=baseUrl+'/addManage';
var delmanage=baseUrl+'/delManage';
var findmanage=baseUrl+'/findManage';
var updatemanage=baseUrl+'/updateManage';

var adduser=baseUrl+'/addUser';
var deluser=baseUrl+'/delUser';
var finduser=baseUrl+'/findUser';
var updateuser=baseUrl+'/updateUser';

var addnotice=baseUrl+'/addNews';
var delnotice=baseUrl+'/delNews';
var findnotice=baseUrl+'/findNews';
var updatenotice=baseUrl+'/updateNews';

var adddevice=baseUrl+'/addDevice';
var deldevice=baseUrl+'/delDevice';
var finddevice=baseUrl+'/findDevice';
var updatedevice=baseUrl+'/updateDevice';


var layout=baseUrl+'/exit'

export default{
    addmanage,login,
    delmanage,findmanage,
    updatemanage,adduser,
    finduser,updateuser,
    deluser,addnotice,
    delnotice,findnotice,updatenotice,
    adddevice,deldevice,
    updatedevice,finddevice,
    layout
}