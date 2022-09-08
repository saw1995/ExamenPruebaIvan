using Microsoft.Extensions.Configuration;
using System;

namespace CapaDatos
{
    public class conexion
    {
        public string cadena()
        {
            //return @"DESKTOP-DQHF519\SQLEXPRESS;Database=practica;Trusted_Connection=True";
            return @"Data Source=DESKTOP-DQHF519\SQLEXPRESS;Initial Catalog=examen;Integrated Security=True;Trust Server Certificate=True;";
        }
    }
}
