﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DataBase.DBClass
{
    class DBbase
    {
        /// <summary>
        /// IP
        /// </summary>
        protected string Ip { get; set; }
        /// <summary>
        /// 帳號
        /// </summary>
        protected string Id { get; set; }
        /// <summary>
        /// 密碼
        /// </summary>
        protected string Pw { get; set; }
        /// <summary>
        /// DB名稱
        /// </summary>
        protected string DbName { get; set; }
        /// <summary>
        /// 連線字串
        /// </summary>
        protected string str_conn { get; set; }

        #region Connection  設定1 連線字串
        /// <summary>
        /// 設定1 連線字串
        /// </summary>
        /// <param name="ip">連線IP</param>
        /// <param name="id">連線帳號</param>
        /// <param name="pw">連線密碼</param>
        protected void Connection(string ip, string id, string pw)
        {
            Ip = ip;
            Id = id;
            Pw = pw;
            str_conn = "Data Source=" + Ip + ";User ID=" + Id + ";Password=" + Pw + ";Initial Catalog=" + DbName + ";Persist Security Info=True;";
        }
        #endregion

        #region Connection 設定2 連線字串
        /// <summary>
        /// 設定2 連線字串
        /// </summary>
        /// <param name="ip">連線IP</param>
        /// <param name="ip2">連線IP2</param>
        /// <param name="id">連線帳號</param>
        /// <param name="pw">連線密碼</param>
        protected void Connection(string ip, string ip2, string id, string pw)
        {
            Ip = ip;
            Id = id;
            Pw = pw;
            str_conn = "Data Source=" + Ip + ";Failover Partner=" + ip2 + ";User ID=" + Id + ";Password=" + Pw + ";Initial Catalog=" + DbName + ";Persist Security Info=True;";
        }
        #endregion
    }
}
