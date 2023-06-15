import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TermsAndConditionsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Términos y Condiciones de Uso</Text>

      <Text style={styles.section}>
        ¡Bienvenido/a a nuestra aplicación dedicada al cuidado del medio ambiente y la sostenibilidad!
        Antes de comenzar a utilizar nuestros servicios, te pedimos que leas atentamente los siguientes
        Términos y Condiciones de Uso. Estos términos establecen los derechos y responsabilidades tanto
        del usuario como de la empresa en relación con el uso de la aplicación. Al acceder o utilizar
        nuestra aplicación, aceptas estar legalmente vinculado/a a estos términos. Si no estás de acuerdo
        con alguno de ellos, te pedimos que no utilices nuestra aplicación.
      </Text>

      <Text style={styles.section}>
        Uso de la Aplicación
      </Text>
      <Text style={styles.content}>
        1.1. Nuestra aplicación está diseñada para ser utilizada únicamente con fines relacionados con el
        cuidado del medio ambiente y la participación en actividades sostenibles.
      </Text>
      <Text style={styles.content}>
        1.2. Al utilizar nuestra aplicación, te comprometes a seguir todas las leyes y regulaciones
        aplicables, así como a respetar los derechos de otros usuarios.
      </Text>

      <Text style={styles.section}>
        Creación de Cuenta
      </Text>
      <Text style={styles.content}>
        2.1. Para acceder a ciertas funcionalidades de la aplicación, es posible que debas crear una cuenta
        proporcionando información precisa y completa.
      </Text>
      <Text style={styles.content}>
        2.2. Eres responsable de mantener la confidencialidad de tu cuenta y de todas las actividades que
        ocurran bajo tu nombre de usuario y contraseña.
      </Text>

      <Text style={styles.section}>
        Grupos y Actividades
      </Text>
      <Text style={styles.content}>
        3.1. Puedes unirte a grupos existentes o crear tus propios grupos relacionados con el medio ambiente
        y la sostenibilidad.
      </Text>
      <Text style={styles.content}>
        3.2. Al participar en actividades, te comprometes a seguir las instrucciones proporcionadas, respetar
        a los demás participantes y actuar de manera segura.
      </Text>

      <Text style={styles.section}>
        Puntaje Ambiental y CO2 Emitido
      </Text>
      <Text style={styles.content}>
        4.1. Nuestra aplicación ofrece la funcionalidad de realizar un seguimiento de tu puntaje ambiental y la
        cantidad de CO2 emitido con base en tus acciones sostenibles.
      </Text>
      <Text style={styles.content}>
        4.2. La precisión del puntaje ambiental y la cantidad de CO2 emitido depende de la información proporcionada
        por el usuario, y se espera que sea honesta y precisa.
      </Text>

      <Text style={styles.section}>
        Propiedad Intelectual
      </Text>
      <Text style={styles.content}>
        5.1. Todos los derechos de propiedad intelectual relacionados con la aplicación, incluyendo pero no limitándose
        a derechos de autor, marcas comerciales y patentes, son propiedad de la empresa.
      </Text>
      <Text style={styles.content}>
        5.2. No se permite la reproducción, distribución o modificación de ningún contenido de la aplicación sin el consentimiento
        previo y por escrito de la empresa.
      </Text>

      <Text style={styles.section}>
        Limitación de Responsabilidad
      </Text>
      <Text style={styles.content}>
        6.1. La empresa no se hace responsable de ningún daño directo, indirecto, incidental, consecuencial o especial que pueda
        surgir del uso o la imposibilidad de uso de la aplicación.
      </Text>
      <Text style={styles.content}>
        6.2. La empresa no garantiza la disponibilidad continua, ininterrumpida o segura de la aplicación y se reserva el derecho
        de suspender o modificar la aplicación en cualquier momento.
      </Text>

      <Text style={styles.section}>
        Modificaciones de los Términos y Condiciones
      </Text>
      <Text style={styles.content}>
        7.1. Nos reservamos el derecho de modificar o actualizar estos Términos y Condiciones en cualquier momento sin previo aviso.
      </Text>
      <Text style={styles.content}>
        7.2. Es responsabilidad del usuario revisar periódicamente los Términos y Condiciones actualizados.
      </Text>

      <Text style={styles.section}>
        Ley Aplicable
      </Text>
      <Text style={styles.content}>
        8.1. Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes del país en el que operamos.
      </Text>

      <Text style={styles.footer}>
        Si tienes alguna pregunta o inquietud sobre estos Términos y Condiciones de Uso, por favor contáctanos a través de los medios
        proporcionados en la aplicación.
      </Text>

      <Text style={styles.footer}>
        ¡Gracias por utilizar nuestra aplicación y por tu compromiso con el cuidado del medio ambiente y la sostenibilidad!
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  footer: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default TermsAndConditionsScreen;