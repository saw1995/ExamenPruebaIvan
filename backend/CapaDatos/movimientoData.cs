using CapaModelo;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class movimientoData
    {
        public async Task<respuestaModelo> agregarMovimiento(string nroCuenta, string tipo, string importe, string tipo_cambio, string glosa)
        {
            var result = new respuestaModelo();
            result.tipo = "servidor";
            result.mensaje = "error en el servidor";
            result.estado = 0;

            DateTime fecha = DateTime.Now;

            using (var con = new SqlConnection(new conexion().cadena()))
            {
                await con.OpenAsync();

                string sql = "INSERT INTO movimiento(nro_cuenta, fecha, tipo, importe, tipo_cambio, glosa) VALUES(@nro_cuenta, @fecha, @tipo, @importe, @tipo_cambio, @glosa)";

                using (var cmd = new SqlCommand(sql, con))
                {
                    cmd.Parameters.AddWithValue("@nro_cuenta", nroCuenta);
                    cmd.Parameters.AddWithValue("@fecha", fecha);
                    cmd.Parameters.AddWithValue("@tipo", tipo);
                    cmd.Parameters.AddWithValue("@importe", importe);
                    cmd.Parameters.AddWithValue("@tipo_cambio", tipo_cambio);
                    cmd.Parameters.AddWithValue("@glosa", glosa);

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

        public async Task<listaMovimientoModelo> listaMovimientosById(String nro_cuenta)
        {
            var listaMovimiento = new listaMovimientoModelo();
            listaMovimiento.lista = new List<movimientoModelo>();

            using (var con = new SqlConnection(new conexion().cadena()))
            {
                await con.OpenAsync();

                string sql = "SELECT nro_cuenta, fecha, tipo, importe, tipo_cambio, glosa FROM movimiento WHERE nro_cuenta = @nro_cuenta";

                using ( var cmd = new SqlCommand(sql, con))
                {
                    cmd.Parameters.AddWithValue("@nro_cuenta", nro_cuenta);

                    using (var drd = await cmd.ExecuteReaderAsync())
                    {
 
                        while (await drd.ReadAsync())
                        {
                            var movimiento = new movimientoModelo();

                            movimiento.nro_cuenta = Convert.ToString(drd["nro_cuenta"]);
                            movimiento.fecha = Convert.ToString(drd["fecha"]);
                            movimiento.tipo = Convert.ToString(drd["tipo"]);
                            movimiento.importe = Convert.ToString(drd["importe"]);
                            movimiento.tipo_cambio = Convert.ToString(drd["tipo_cambio"]);
                            movimiento.glosa = Convert.ToString(drd["glosa"]);

                            listaMovimiento.lista.Add(movimiento);
                        }
                    }

                }
            }
                return listaMovimiento;
        }
    }
}
