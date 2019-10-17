using DataBase.DBClass;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataBase.DBModels
{
    class SampleDB : DBConnection
    {
        public SampleDB(IConfiguration Configuration)
        {
            base.DbName = "SampleDB";
            _Configuration = Configuration;
            Connection(DbName);
        }

        #region 下SQL法
        /// <summary>
        /// 取得APPKEY
        /// </summary>
        /// <param name="appid">應用程式識別碼</param>
        public string Appkey_Get(string appid)
        {
            StringBuilder SqlString = new StringBuilder("SELECT Top 1 [欄位名稱] FROM [DB名稱].[dbo].[表名] WITH (NOLOCK)");
            SqlString.Append("WHERE[條件一] ='").Append(appid).Append("'");
            return SystemDB.DB_Action_Single<string>(str_conn, SqlString.ToString(), null);
        }
        #endregion
    }
}
