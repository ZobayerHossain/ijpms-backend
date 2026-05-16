import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendApplicationConfirmation(
    applicantEmail: string,
    applicantName: string,
    positionTitle: string,
    company: string,
    appliedAt: string,
  ) {
    await this.mailerService.sendMail({
      to: applicantEmail,
      subject: `Application Confirmed – ${positionTitle}`,
      template: 'application-confirmation',
      context: {
        applicantName,
        positionTitle,
        company,
        appliedAt,
      },
    });
  }

  async sendInterviewResult(
    applicantEmail: string,
    applicantName: string,
    positionTitle: string,
    company: string,
    status: string,
    score?: number,
    notes?: string,
  ) {
    const statusClass =
      status === 'selected'
        ? 'selected'
        : status === 'rejected'
        ? 'rejected'
        : 'waitlisted';

    await this.mailerService.sendMail({
      to: applicantEmail,
      subject: `Interview Result – ${positionTitle}`,
      template: 'interview-result',
      context: {
        applicantName,
        positionTitle,
        company,
        status: status.charAt(0).toUpperCase() + status.slice(1),
        statusClass,
        score,
        notes,
        isSelected: status === 'selected',
      },
    });
  }
}