using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CollectiveBook.Api.CronJobs
{
    public class JobScheduler
    {
        public static void Start()
        {
            IScheduler scheduler = StdSchedulerFactory.GetDefaultScheduler();
            scheduler.Start();

            IJobDetail pingjob = JobBuilder.Create<PingSitesJob>().Build();

            ITrigger pingtrigger = TriggerBuilder.Create()
                .StartNow()
                .WithSimpleSchedule(x => x
                .WithIntervalInMinutes(5)
                .RepeatForever())
                .Build();

            scheduler.ScheduleJob(pingjob, pingtrigger);
        }
    }
}