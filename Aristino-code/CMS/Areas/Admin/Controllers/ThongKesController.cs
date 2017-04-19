using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using CMS.Models;

namespace CMS.Areas.Admin.Controllers
{
    public class ThongKesController : Controller
    {
        private AristinoEntities db = new AristinoEntities();

        // GET: Admin/ThongKes
        public ActionResult Index()
        {
            return View(db.ThongKe.ToList());
        }

        // GET: Admin/ThongKes/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ThongKe thongKe = db.ThongKe.Find(id);
            if (thongKe == null)
            {
                return HttpNotFound();
            }
            return View(thongKe);
        }

        // GET: Admin/ThongKes/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/ThongKes/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,ten,diaChi,SDT,email,soLanMuaHang")] ThongKe thongKe)
        {
            if (ModelState.IsValid)
            {
                db.ThongKe.Add(thongKe);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(thongKe);
        }

        // GET: Admin/ThongKes/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ThongKe thongKe = db.ThongKe.Find(id);
            if (thongKe == null)
            {
                return HttpNotFound();
            }
            return View(thongKe);
        }

        // POST: Admin/ThongKes/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,ten,diaChi,SDT,email,soLanMuaHang")] ThongKe thongKe)
        {
            if (ModelState.IsValid)
            {
                db.Entry(thongKe).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(thongKe);
        }

        // GET: Admin/ThongKes/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ThongKe thongKe = db.ThongKe.Find(id);
            if (thongKe == null)
            {
                return HttpNotFound();
            }
            return View(thongKe);
        }

        // POST: Admin/ThongKes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            ThongKe thongKe = db.ThongKe.Find(id);
            db.ThongKe.Remove(thongKe);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
