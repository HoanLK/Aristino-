using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CMS.Models;

namespace CMS.Areas.Admin.Controllers
{
    public class ThongKeAPIController : ApiController
    {
        private AristinoEntities db = new AristinoEntities();

        // GET: api/ThongKeAPI
        public IQueryable<ThongKe> GetThongKe()
        {
            return db.ThongKe.OrderByDescending(p => p.soLanMuaHang);
        }

        // GET: api/ThongKeAPI/5
        [ResponseType(typeof(ThongKe))]
        public IHttpActionResult GetThongKe(int id)
        {
            ThongKe thongKe = db.ThongKe.Find(id);
            if (thongKe == null)
            {
                return NotFound();
            }

            return Ok(thongKe);
        }

        //GET: API/ThongKeAPI?value=...
        [ResponseType(typeof(ThongKe))]
        public IHttpActionResult GetThongKe(string value)
        {
            ThongKe thongKe = db.ThongKe.Where(p =>p.SDT ==value).FirstOrDefault();
            if (thongKe == null)
            {
                return NotFound();
            }
            return Ok(thongKe);
        }

        // PUT: api/ThongKeAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutThongKe(int id, ThongKe thongKe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != thongKe.id)
            {
                return BadRequest();
            }

            db.Entry(thongKe).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ThongKeExists(id))
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

        // POST: api/ThongKeAPI
        [ResponseType(typeof(ThongKe))]
        public IHttpActionResult PostThongKe(ThongKe thongKe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ThongKe.Add(thongKe);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = thongKe.id }, thongKe);
        }

        // DELETE: api/ThongKeAPI/5
        [ResponseType(typeof(ThongKe))]
        public IHttpActionResult DeleteThongKe(int id)
        {
            ThongKe thongKe = db.ThongKe.Find(id);
            if (thongKe == null)
            {
                return NotFound();
            }

            db.ThongKe.Remove(thongKe);
            db.SaveChanges();

            return Ok(thongKe);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ThongKeExists(int id)
        {
            return db.ThongKe.Count(e => e.id == id) > 0;
        }
    }
}