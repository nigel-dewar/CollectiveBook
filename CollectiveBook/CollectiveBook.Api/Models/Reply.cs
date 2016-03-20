using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CollectiveBook.Api.Models
{
    public class Reply
    {
        public Reply()
        {
            Created = DateTime.Now;
        }

        public int Id { get; set; }

        [Required]
        public string ReplyContent { get; set; }

        [Required]
        public string CreatedBy { get; set; }

        public DateTime Created { get; set; }

        //nav properties
        public int PostId { get; set; }
 
        public Post Post { get; set; }

    }
}