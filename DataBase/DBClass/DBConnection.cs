using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataBase.DBClass
{
    class DBConnection:DBbase
    {
        public virtual IConfiguration _Configuration { get; set; }

        public void Connection(string dbName)
        {
            String ip = _Configuration[dbName + ":ip"];
            String user = _Configuration[dbName + ":user"];
            String pwd = _Configuration[dbName + ":pwd"];
            Connection(ip, user, pwd);
        }
    }
}
