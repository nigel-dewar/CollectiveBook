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
    [RoutePrefix("api/replies")]
    public class RepliesController : ApiController
    {
        private CBContext db = new CBContext();

        // GET: api/Replies
        [EnableQuery(MaxExpansionDepth = 2)]
        [Route("")]
        [HttpGet]
        public IQueryable<Reply> GetReplies()
        {
            var results = db.Replies
                .ToList().AsQueryable();
            return results;
        }

        // GET: api/Replies/5
        [HttpGet]
        [Route("{id}")]
        [ResponseType(typeof(Reply))]
        public IHttpActionResult GetReplies(int id)
        {
            Reply reply = db.Replies.Find(id);
            if (reply == null)
            {
                return NotFound();
            }

            return Ok(reply);
        }

        // PUT: api/Replies/5
        [HttpPatch]
        [Route("{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutReplies(int id, Reply reply)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != reply.Id)
            {
                return BadRequest();
            }

            db.Entry(reply).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReplyExists(id))
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

        // POST: api/Replies
        [HttpPost]
        [Route("", Name = "CreateReply")]
        [ResponseType(typeof(Reply))]
        public IHttpActionResult CreateReply(Reply reply)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Replies.Add(reply);
            db.SaveChanges();

            return CreatedAtRoute("CreateReply", new { id = reply.Id }, reply);
        }

        // DELETE: api/Replies/5
        [HttpDelete]
        [Route("{id}")]
        [ResponseType(typeof(Reply))]
        public IHttpActionResult DeleteReplies(int id)
        {
            Reply reply = db.Replies.Find(id);
            if (reply == null)
            {
                return NotFound();
            }

            db.Replies.Remove(reply);
            db.SaveChanges();

            return Ok(reply);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ReplyExists(int id)
        {
            return db.Replies.Count(e => e.Id == id) > 0;
        }

    }
}
