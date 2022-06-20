using Microsoft.AspNetCore.Identity;
using System;

namespace LB3.Models
{
    public class User : IdentityUser
    {
        public DateTime DateOfBirth { get; set; }
    }
}
