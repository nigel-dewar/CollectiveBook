using CollectiveBook.Api.DAL;
using CollectiveBook.Api.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.Http.OData;

namespace CollectiveBook.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/posts")]
    public class PostsController : ApiController
    {
        private CBContext db = new CBContext();


        // GET: api/Posts
        [EnableQuery(MaxExpansionDepth = 2)]
        [Route("")]
        [HttpGet]
        public IQueryable<Post> GetPosts()
        {
            var results = db.Posts
                .ToList().AsQueryable();
            return results;
        }

        // GET: api/Posts/5
        [HttpGet]
        [Route("{id}")]
        [ResponseType(typeof(Post))]
        public IHttpActionResult GetPost(int id)
        {
            Post post = db.Posts.Find(id);
            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        // PUT: api/Posts/5
        [HttpPatch]
        [Route("{id}", Name = "PutPost")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPost(int id, [FromBody]Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != post.Id)
            {
                return BadRequest();
            }

            db.Entry(post).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Posts
        [HttpPost]
        [Route("", Name = "CreatePost")]
        [ResponseType(typeof(Post))]
        public IHttpActionResult CreatePost([FromBody]Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Posts.Add(post);
            db.SaveChanges();

            var returnpost = db.Posts.Include(p => p.Creator).Where(s => s.Id == post.Id).FirstOrDefault();

            return Ok(returnpost);
        }

        // DELETE: api/Posts/5
        [HttpDelete]
        [Route("{id}")]
        [ResponseType(typeof(Post))]
        public IHttpActionResult DeletePost(int id)
        {
            Post post = db.Posts.Find(id);
            if (post == null)
            {
                return NotFound();
            }

            db.Posts.Remove(post);
            db.SaveChanges();

            return Ok(post);
        }



        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PostExists(int id)
        {
            return db.Posts.Count(e => e.Id == id) > 0;
        }

    }
}
