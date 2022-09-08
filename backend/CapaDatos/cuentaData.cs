using CapaModelo;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class cuentaData
    {
        public async Task<respuestaModelo> agregarCuenta(string nroCuenta, string tipo, string moneda, string nombre, string saldo)
        {
            var result = new respuestaModelo();
            result.tipo = "servidor";
            result.mensaje = "error en el servidor";
            result.estado = 0;
            
            using (var con = new SqlConnection(new conexion().cadena()))
            {
                await con.OpenAsync();

                string sql = "INSERT INTO cuenta(nro_cuenta, tipo, moneda, nombre, saldo) VALUES(@nro_cuenta, @tipo, @moneda, @nombre, @saldo)";

                using (var cmd = new SqlCommand(sql, con))
                {
                    cmd.Parameters.AddWithValue("@nro_cuenta", nroCuenta);
                    cmd.Parameters.AddWithValue("@tipo", tipo);
                    cmd.Parameters.AddWithValue("@moneda", moneda);
                    cmd.Parameters.AddWithValue("@nombre", nombre);
                    cmd.Parameters.AddWithValue("@saldo", saldo);

                    try
                    {
                        int n = await cmd.ExecuteNonQueryAsync();

                        if (n == 1)
                        {
                            result.mensaje = "Registro agregado";
                            result.estado = 1;
                        }
                    }
                    catch (Exception ex)
                    {
                        result.mensaje = ex.Message.ToString();
                        result.estado = 0;
                    }
                }
            }

            return result;
        }

        public async Task<respuestaModelo> actualizarSaldoByNroCuenta(decimal saldo, string nroCuenta)
        {
            var result = new respuestaModelo();
            result.tipo = "servidor";
            result.mensaje = "error en el servidor";
            result.estado = 0;

            using (var con = new SqlConnection(new conexion().cadena()))
            {
                await con.OpenAsync();

                string sql = "UPDATE cuenta SET saldo = @saldo WHERE nro_cuenta = @nro_cuenta";

                using (var cmd = new SqlCommand(sql, con))
                {
                    cmd.Parameters.AddWithValue("@saldo", saldo);
                    cmd.Parameters.AddWithValue("@nro_cuenta", nroCuenta);;
                    try
                    {
                        int n = await cmd.ExecuteNonQueryAsync();

                        if (n == 1)
                        {
                            result.mensaje = "Registro agregado";
                            result.estado = 1;
                        }
                    }
                    catch (Exception ex)
                    {
                        result.mensaje = ex.Message.ToString();
                        result.estado = 0;
                    }
                }
            }

            return result;
        }

        public async Task<listaCuentaModelo> cuentaByNroCuenta(String nro_cuenta)
        {
            //var cuenta = new cuentaModelo();
            var listaCuenta = new listaCuentaModelo();
            listaCuenta.lista = new List<cuentaModelo>();

            using (var con = new SqlConnection(new conexion().cadena()))
            {
                await con.OpenAsync();

                string sql = "SELECT nro_cuenta, tipo, moneda, nombre, saldo FROM cuenta WHERE nro_cuenta = @nro_cuenta";

                using (var cmd = new SqlCommand(sql, con))
                {
                    cmd.Parameters.AddWithValue("@nro_cuenta", nro_cuenta);

                    using (var drd = await cmd.ExecuteReaderAsync())
                    {

                        while (await drd.ReadAsync())
                        {
                            var cuenta = new cuentaModelo();
 
                            cuenta.nro_cuenta = Convert.ToString(drd["nro_cuenta"]);
                            cuenta.tipo = Convert.ToString(drd["tipo"]);
                            cuenta.moneda = Convert.ToString(drd["moneda"]);
                            cuenta.nombre = Convert.ToString(drd["nombre"]);
                            cuenta.saldo = Convert.ToString(drd["saldo"]);

                            listaCuenta.lista.Add(cuenta);
                        }
                    }

                }
            }
            return listaCuenta;
        }

        public async Task<listaCuentaModelo> listaCuentas()
        {
            //var cuenta = new cuentaModelo();
            var listaCuenta = new listaCuentaModelo();
            listaCuenta.lista = new List<cuentaModelo>();

            using (var con = new SqlConnection(new conexion().cadena()))
            {
                await con.OpenAsync();

                string sql = "SELECT nro_cuenta, tipo, moneda, nombre, saldo FROM cuenta";

                using ( var cmd = new SqlCommand(sql, con))
                {
                    //cmd.Parameters.AddWithValue("@nombre", nombre);

                    using (var drd = await cmd.ExecuteReaderAsync())
                    {
 
                        while (await drd.ReadAsync())
                        {
                            var cuenta = new cuentaModelo();
                            Console.WriteLine(drd["nro_cuenta"]);
                            cuenta.nro_cuenta = Convert.ToString(drd["nro_cuenta"]);
                            cuenta.tipo = Convert.ToString(drd["tipo"]);
                            cuenta.moneda = Convert.ToString(drd["moneda"]);
                            cuenta.nombre = Convert.ToString(drd["nombre"]);
                            cuenta.saldo = Convert.ToString(drd["saldo"]);

                            listaCuenta.lista.Add(cuenta);
                        }
                    }

                }
            }
                return listaCuenta;
        }
    }
}
