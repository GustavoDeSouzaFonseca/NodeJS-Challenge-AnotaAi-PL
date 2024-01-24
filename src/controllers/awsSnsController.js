import AwsSnsService from '../services/snsController.js';

class AwsSnsController {
  static async testingConnectionAwsSns(_, res, next) {
    try {
      const receiveResult = await AwsSnsService.checkSnsConnection();
      res.status(200).json({ success: true, message: 'Conexão com o SNS bem-sucedida!', data: receiveResult });
    } catch (error) {
      next({ success: false, message: 'Erro ao verificar a conexão com o SNS', error: error.message });
    }
  }
}

export default AwsSnsController;
