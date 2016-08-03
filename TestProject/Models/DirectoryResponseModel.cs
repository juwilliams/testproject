using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestProject.Models
{
    public class DirectoryResponseModel
    {
        public string WorkingDirectory { get; set; }
        public List<string> Folders { get; set; }
        public List<string> Files { get; set; }

        public DirectoryResponseModel()
        {
            Folders = new List<string>();
            Files = new List<string>();
        }
    }
}