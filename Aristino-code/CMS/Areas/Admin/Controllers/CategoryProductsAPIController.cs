﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using CMS.Models;

namespace CMS.Areas.Admin.Controllers
{
    public class CategoryProductsAPIController : ApiController
    {
        private AristinoEntities db = new AristinoEntities();

        // GET: api/CategoryProductsAPI
        public List<CategoryProduct> GetCategoryProduct()
        {
            return db.CategoryProduct.ToList();
        }

        // GET: api/CategoryProductsAPI/5
        [ResponseType(typeof(CategoryProduct))]
        public async Task<IHttpActionResult> GetCategoryProduct(int id)
        {
            CategoryProduct categoryProduct = await db.CategoryProduct.FindAsync(id);
            if (categoryProduct == null)
            {
                return NotFound();
            }

            return Ok(categoryProduct);
        }

        //GET: API/CategoryProductsAPI?att=...&&value=...
        public IQueryable<CategoryProduct> GetCateroryProduct(string att, string value)
        {
            var cateroryProduct = db.CategoryProduct;

            if (att == "idCategoryParent" && att != null && value != null)
            {
                int idCategoryProduct = int.Parse(value);
                var model = db.CategoryProduct.Where(p => p.idCategoryParent == idCategoryProduct);

                db.Configuration.LazyLoadingEnabled = false;
                db.Configuration.ProxyCreationEnabled = false;

                return model;
            }

            return cateroryProduct;
        }

        // PUT: api/CategoryProductsAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCategoryProduct(int id, CategoryProduct categoryProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != categoryProduct.idCategory)
            {
                return BadRequest();
            }

            db.Entry(categoryProduct).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryProductExists(id))
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

        // POST: api/CategoryProductsAPI
        [ResponseType(typeof(CategoryProduct))]
        public async Task<IHttpActionResult> PostCategoryProduct(CategoryProduct categoryProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CategoryProduct.Add(categoryProduct);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = categoryProduct.idCategory }, categoryProduct);
        }

        // DELETE: api/CategoryProductsAPI/5
        [ResponseType(typeof(CategoryProduct))]
        public async Task<IHttpActionResult> DeleteCategoryProduct(int id)
        {
            CategoryProduct categoryProduct = await db.CategoryProduct.FindAsync(id);
            if (categoryProduct == null)
            {
                return NotFound();
            }

            db.CategoryProduct.Remove(categoryProduct);
            await db.SaveChangesAsync();

            return Ok(categoryProduct);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoryProductExists(int id)
        {
            return db.CategoryProduct.Count(e => e.idCategory == id) > 0;
        }
    }
}