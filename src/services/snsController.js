import snsClient from '../config/aws/awsSNSConfig.js';
import ErrorBase from '../errors/errorBase.js';

class AwsSnsService {
  static async recordMessage(message) {
    const catalogyTopicEmit = process.env.AWS_SNS_TOPIC_ARN;

    try {
      await snsClient.publish({
        TopicArn: catalogyTopicEmit,
        Message: JSON.stringify({ key: message }),
      }).promise();
    } catch (err) {
      console.error('Erro ao publicar mensagem:', err.message);
      throw err;
    }
  }

  static async checkSnsConnection() {
    try {
      const result = await snsClient.listTopics().promise();
      return result;
    } catch (err) {
      throw new ErrorBase(`Erro ao verificar a conexão com o SNS: ${err}`);
    }
  }
}

export default AwsSnsService;
