function validarLogin(nombre, clave) {
  var host = "jdbc:mysql://db4free.net:3306/TU-USUARIO"; // Cambia por tu host y puerto
  var usuario = "TU-USUARIO";
  var contrasena = "TU-CLAVE";

  try {
    var conexion = Jdbc.getConnection(host, usuario, contrasena);
    var stmt = conexion.prepareStatement("SELECT COUNT(*) AS total FROM usuarios WHERE nombre = ? AND clave = ?");
    stmt.setString(1, nombre);
    stmt.setString(2, clave);

    var resultados = stmt.executeQuery();
    var existe = false;

    if (resultados.next()) {
      existe = resultados.getInt("total") > 0;
    }

    conexion.close();

    if (existe) {
      registrarEnSheet(nombre, clave); // Si el usuario es válido, guardar en Sheets
    }

    return { success: existe };
  } catch (e) {
    return { success: false, error: e.message };
  }
}
