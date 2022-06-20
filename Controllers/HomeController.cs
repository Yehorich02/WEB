using LB3.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace LB3.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private ApplicationContext context;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;
        public HomeController(
            ILogger<HomeController> logger,
            ApplicationContext context,
            RoleManager<IdentityRole> _roleManager,
            UserManager<User> _userManager,
            SignInManager<User> _signInManager)
        {
            _logger = logger;
            this.context = context;
            roleManager = _roleManager;
            userManager = _userManager;
            signInManager = _signInManager;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Admin()
        {
            User user = userManager.Users.FirstOrDefault(_ => _.Email == User.Identity.Name);
            var articles = context.Articles.Where(_ => _.UserId == user.Id).ToList();
            return View(articles);
        }

        public IActionResult Articles()
        {
            var articles = context.Articles.ToList();
            return View(articles);
        }

        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Create(Article model, IFormFile Image)
        {
            User user = userManager.Users.FirstOrDefault(_ => _.Email == User.Identity.Name);
            if (Image != null)
            {
                using (var ms = new MemoryStream())
                {
                    Image.CopyTo(ms);
                    model.Image = ms.ToArray();
                }
            }
            model.UserId = user.Id;
            await context.Articles.AddAsync(model);
            await context.SaveChangesAsync();

            return RedirectToAction("Admin");
        }

        public IActionResult Edit(int id)
        {
            var article = context.Articles.FirstOrDefault(_ => _.Id == id);
            return View(article);
        }
        [HttpPost]
        public async Task<IActionResult> Edit(Article model, IFormFile Image)
        {
            var article = context.Articles.FirstOrDefault(_ => _.Id == model.Id);
            article.Text = model.Text;
            article.Title = model.Title;
            if (Image != null)
            {
                using (var ms = new MemoryStream())
                {
                    Image.CopyTo(ms);
                    article.Image = ms.ToArray();
                }
            }
            context.Articles.Update(article);
            await context.SaveChangesAsync();
            return RedirectToAction("Admin");
        }

        public IActionResult Article1()
        {
            return View();
        }

        public IActionResult Discussion()
        {
            return View();
        }

        public IActionResult SignIn()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SignIn(Login model)
        {
            var result = await signInManager.PasswordSignInAsync(model.Email, model.Password, true, false);
            if (result.Succeeded)
            {
                return RedirectToAction("Index", "Home");
            }
            return View(model);
        }

        public IActionResult SignUp()
        {
            return View();
        }

        public IActionResult Profile()
        {
            User user = userManager.Users.FirstOrDefault(_ => _.Email == User.Identity.Name);
            return View(user);
        }

        [HttpPost]
        public async Task<IActionResult> SignUp(Register model)
        {
            User user = new User { Email = model.Email, UserName = model.Email, DateOfBirth = model.DateOfBirth };
            var result = await userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                return RedirectToAction("SignIn", "Home");
            }
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public async Task Initialize()
        {
            string adminEmail = "admin@gmail.com";
            string adminPassword = "Admin60327";
            string userEmail = "yehor@gmail.com";
            string userPassword = "yehor1234";
            if (await roleManager.FindByNameAsync("admin") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("admin"));
            }
            if (await roleManager.FindByNameAsync("user") == null)
            {
                await roleManager.CreateAsync(new IdentityRole("user"));
            }
            if (await userManager.FindByNameAsync(adminEmail) == null)
            {
                User admin = new User { Email = adminEmail, UserName = adminEmail, DateOfBirth = DateTime.Now.Date };
                var result = await userManager.CreateAsync(admin, adminPassword);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "admin");
                }
            }
            if (await userManager.FindByNameAsync(userEmail) == null)
            {
                User user = new User { Email = userEmail, UserName = userEmail, DateOfBirth = DateTime.Now.Date };
                var result = await userManager.CreateAsync(user, userPassword);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, "user");
                }
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
