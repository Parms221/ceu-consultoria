import { useState } from 'react';
import { StarIcon } from 'lucide-react';
import Alert from './alert-msj';
import { toast } from "sonner";
import {enviarEncuesta} from "@/actions/Proyecto/FeedbackCliente/index"
import { useProjectDetail } from '../../../contexto/proyecto-detail.context';



const CustomerSatisfactionSurvey = () => {
  const { projectId, gptHitos, setGptHitos, queryClient } = useProjectDetail()

  const [formData, setFormData] = useState({
    generalSatisfaction: '',
    productQuality: '',
    teamService: '',
    easeOfUse: '',
    responseTime: '',
    expectations: '',
    likelihoodToRecommend: '',
    additionalComments: ''
  });

  const [hoveredStars, setHoveredStars] = useState<Record<string, number | null>>({});
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStarClick = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleMouseEnter = (name: string, star: number) => {
    setHoveredStars({
      ...hoveredStars,
      [name]: star
    });
  };

  const handleMouseLeave = (name: string) => {
    setHoveredStars({
      ...hoveredStars,
      [name]: null
    });
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();



    const calificaciones = [
        formData.generalSatisfaction,
        formData.productQuality,
        formData.teamService,
        formData.easeOfUse,
        formData.responseTime,
        formData.expectations,
        formData.likelihoodToRecommend
      ].map(value => parseInt(value, 10));
  
    const allRatingsValid = calificaciones.every(value => value > 0);

    if (!allRatingsValid) {
        toast.error('Completar todas las preguntas')
        return;
    }
      // Construye el objeto JSON
      const surveyData = {
        calificaciones,
        comentario: formData.additionalComments
      };

      try {
        await enviarEncuesta(projectId, surveyData.calificaciones, surveyData.comentario);
        toast.success('Encuesta enviada con éxito');
      } catch (error) {
        console.error('Error al enviar la encuesta:', error);
        toast.error('Error al enviar la encuesta');
      }

    // console.log('Survey submitted:', formData);
    // alert('¡Gracias por tu retroalimentación!');
    // setFormData({
    //   generalSatisfaction: '',
    //   productQuality: '',
    //   teamService: '',
    //   easeOfUse: '',
    //   responseTime: '',
    //   expectations: '',
    //   likelihoodToRecommend: '',
    //   additionalComments: ''
    // });
  };

  const renderStars = (name: string, value: string) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <StarIcon
        key={star}
        className={`h-8 w-8 cursor-pointer ${
          star <= (hoveredStars[name] || parseInt(formData[name], 10))
            ? 'text-yellow-400'
            : 'text-gray-300'
        }`}
        onMouseEnter={() => handleMouseEnter(name, star)}
        onMouseLeave={() => handleMouseLeave(name)}
        onClick={() => handleStarClick(name, star.toString())}
      />
    ));
  };

  return (
    <div className="max-w mx-auto p-8 bg-white shadow-xl rounded-lg">
        {alert && (
            <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
            />
        )}
      <p className="mb-4 text-sm text-gray-700">
        Gracias por brindarnos la oportunidad de conocer tu experiencia con nuestros servicios/productos. Tu perspectiva es fundamental para nosotros, y nos entusiasma saber cómo te has sentido a lo largo de todo el proceso. Queremos asegurarnos de que cada interacción sea excepcional y tu retroalimentación es clave para lograrlo. Apreciamos sinceramente tus comentarios y el tiempo que dedicas para compartirlos con nosotros
      </p>

      <p className="mb-6 text-xs text-gray-100">
        <strong className="">Leyenda de Valores:</strong>
        <br />
        Califica tu experiencia en una escala de 1 a 5 estrellas:
        <ul className="list-disc list-inside mt-4 ml-6 space-y-2">
            <li>
            <strong>1 estrella:</strong> Muy insatisfecho. El servicio/producto no cumplió con tus expectativas en absoluto y encontraste problemas significativos.
            </li>
            <li>
            <strong>2 estrellas:</strong> Insatisfecho. El servicio/producto tuvo varias deficiencias y no cumplió con muchas de tus expectativas.
            </li>
            <li>
            <strong>3 estrellas:</strong> Neutral. El servicio/producto fue aceptable, pero hubo áreas que podrían mejorar.
            </li>
            <li>
            <strong>4 estrellas:</strong> Satisfecho. El servicio/producto cumplió con la mayoría de tus expectativas, con algunas áreas menores de mejora.
            </li>
            <li>
            <strong>5 estrellas:</strong> Muy satisfecho. El servicio/producto superó tus expectativas y no encontraste problemas significativos.
            </li>
        </ul>
      </p>


      <form onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 gap-8 mt-8'>
          <div className="mb-6">
            <label className="block text-md font-medium text-gray-700 text-justify">1. ¿Cómo calificarías tu satisfacción general con nuestro servicio/producto?</label>
            <div className="mt-4 flex justify-center space-x-2">
              {renderStars('generalSatisfaction', formData.generalSatisfaction)}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-md font-medium text-gray-700 text-justify">2. ¿Cómo evaluas la calidad del producto/servicio que recibiste?</label>
            <div className="mt-4 flex justify-center space-x-2">
              {renderStars('productQuality', formData.productQuality)}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-md font-medium text-gray-700 text-justify">3. ¿Cómo calificarías la atención y el trato recibido por parte de nuestro equipo?</label>
            <div className="mt-4 flex justify-center space-x-2">
              {renderStars('teamService', formData.teamService)}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-md font-medium text-gray-700 text-justify">4. ¿Cómo valoras la facilidad de uso de nuestro producto/servicio?</label>
            <div className="mt-4 flex justify-center space-x-2">
              {renderStars('easeOfUse', formData.easeOfUse)}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-md font-medium text-gray-700 text-justifys">5. ¿Qué tan rápido fue el proceso de atención/resolución de problemas?</label>
            <div className="mt-4 flex justify-center space-x-2">
              {renderStars('responseTime', formData.responseTime)}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-md font-medium text-gray-700 text-justify">6. ¿En qué medida crees que nuestro producto/servicio cumple con tus expectativas?</label>
            <div className="mt-4 flex justify-center space-x-2">
              {renderStars('expectations', formData.expectations)}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-md font-medium text-gray-700 text-justify">7. ¿Qué tan probable es que recomiendes nuestro producto/servicio a otros?</label>
            <div className="mt-4 flex justify-center space-x-2">
              {renderStars('likelihoodToRecommend', formData.likelihoodToRecommend)}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-md font-medium text-gray-700 text-justify">8. ¿Tienes algún comentario adicional o sugerencia para mejorar nuestro producto/servicio?</label>
            <textarea
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleChange}
              rows={4}
              className="w-full mt-4 p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              placeholder="Tus comentarios aquí..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="mx-auto block bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition duration-300"
        >
          Enviar Informacion
        </button>
      </form>
    </div>
  );
};

export default CustomerSatisfactionSurvey;
