using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace CollectiveBook.Api.CronJobs
{
    public class PingSitesJob : IJob
    {
        public void Execute(IJobExecutionContext context)
        {
            string backend = "https://api-collectivebook.azurewebsites.net/";
            string frontend = "http://collectivebook.azurewebsites.net/";

            using (WebClient client = new WebClient())
            {
                client.DownloadString(backend);
                client.DownloadString(frontend);
            }
        }
    }
}