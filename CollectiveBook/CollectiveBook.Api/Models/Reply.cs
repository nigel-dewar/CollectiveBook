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

        public int PersonId { get; set; }
        public virtual Person Creator { get; set; }

        public DateTime Created { get; set; }

        //nav properties
        public int PostId { get; set; }
 
        public virtual Post Post { get; set; }

    }
}