import snsClient from '../config/aws/awsSNSConfig.js';

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
}

export default AwsSnsService;
