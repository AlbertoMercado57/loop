import { Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async AsanaLoginPage() {
            await this.page.getByLabel('Email address')
            await this.page.getByLabel('password')
            await this.page.getByText('Continue')

        }
    }
