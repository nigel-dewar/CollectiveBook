using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CollectiveBook.Api.Models
{
    public class Post
    {

        public Post()
        {
            Replies = new HashSet<Reply>();
            Created = DateTime.Now;
        }

        public int Id { get; set; }

        [Required]
        public string PostContent { get; set; }

        public int PersonId { get; set; }
        public virtual Person Creator { get; set; }

        public DateTime Created { get; set; }

        public virtual ICollection<Reply> Replies { get; set; }
    }
}