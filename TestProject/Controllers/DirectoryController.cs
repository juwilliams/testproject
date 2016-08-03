using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Web.Mvc;
using System.Linq;
using TestProject.Models;
using System;
using System.Web;

namespace TestProject.Controllers
{
    public class DirectoryController : Controller
	{
        const string _key_rootPath = "root-path";
        const string _format_item_and_size = "{0}|{1}";
        const string _format_filesize = "{0:0.##} {1}";

        #region Endpoint Behavior

        public ActionResult Contents(string path)
        {
            if (string.IsNullOrEmpty(path))
            {
                path = ConfigurationManager.AppSettings[_key_rootPath];
            }

            DirectoryResponseModel response = new DirectoryResponseModel()
            {
                WorkingDirectory = path
            };

            try
            {
                this.addDirectoryChildren(response);
            }
            catch
            {
                //  log this..
            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        //public HttpResponse Upload(string path)
        //{
        //    if (string.IsNullOrEmpty(path))
        //    {
        //        return null;
        //    }

        //    HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;

        //    foreach (HttpPostedFile file in files)
        //    {
        //        string fileName = Path.GetFileName(file.FileName);

        //        if (!System.IO.File.Exists(path + Path.GetFileName(file.FileName)))
        //        {
        //            file.SaveAs(path + fileName);
        //        }
        //    }
        //}

        #endregion


        #region Helpers

        private void addDirectoryChildren(DirectoryResponseModel response)
        {
            foreach (string directory in Directory.GetDirectories(response.WorkingDirectory))
            {
                string size = getFriendlyFileSize(getDirectorySize(directory));

                response.Folders.Add(string.Format(_format_item_and_size, directory.Replace(response.WorkingDirectory, ""), size));
            }

            foreach (string file in Directory.GetFiles(response.WorkingDirectory))
            {
                string size = getFriendlyFileSize(new FileInfo(file).Length);

                response.Files.Add(string.Format(_format_item_and_size, file.Replace(response.WorkingDirectory, ""), size));
            }
        }

        private long getDirectorySize(string path)
        {
            try
            {
                DirectoryInfo directoryInfo = new DirectoryInfo(path);
                return directoryInfo.EnumerateFiles("*", SearchOption.AllDirectories).Sum(p => p.Length);
            }
            catch
            {
                return -1;
            }
        }

        private string getFriendlyFileSize(long bitLen)
        {            
            string[] sizes = { "b", "kb", "mb", "gb" };

            int magnitude = 0;

            while (bitLen >= 1024 && ++magnitude < sizes.Length)
            {
                bitLen = bitLen / 1024;
            }
            
            return string.Format(_format_filesize, bitLen, sizes[magnitude]);
        }

        #endregion
    }
}