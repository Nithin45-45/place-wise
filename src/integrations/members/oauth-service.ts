/**
 * OAuth Service for Social Login Integration
 * Handles Google, GitHub, and other OAuth providers
 */

export interface OAuthProvider {
  name: 'google' | 'github' | 'microsoft';
  clientId: string;
  redirectUri: string;
  scope: string[];
}

export interface OAuthConfig {
  google?: OAuthProvider;
  github?: OAuthProvider;
  microsoft?: OAuthProvider;
}

class OAuthService {
  private config: OAuthConfig = {};

  /**
   * Initialize OAuth configuration
   * In production, these should come from environment variables
   */
  initialize(config: OAuthConfig) {
    this.config = config;
  }

  /**
   * Get Google OAuth URL for login
   */
  getGoogleAuthUrl(): string {
    const googleConfig = this.config.google;
    if (!googleConfig) {
      console.warn('Google OAuth not configured');
      return '';
    }

    const params = new URLSearchParams({
      client_id: googleConfig.clientId,
      redirect_uri: googleConfig.redirectUri,
      response_type: 'code',
      scope: googleConfig.scope.join(' '),
      access_type: 'offline',
      prompt: 'consent'
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  /**
   * Get GitHub OAuth URL for login
   */
  getGitHubAuthUrl(): string {
    const githubConfig = this.config.github;
    if (!githubConfig) {
      console.warn('GitHub OAuth not configured');
      return '';
    }

    const params = new URLSearchParams({
      client_id: githubConfig.clientId,
      redirect_uri: githubConfig.redirectUri,
      scope: githubConfig.scope.join(' '),
      allow_signup: 'true'
    });

    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  }

  /**
   * Get Microsoft OAuth URL for login
   */
  getMicrosoftAuthUrl(): string {
    const microsoftConfig = this.config.microsoft;
    if (!microsoftConfig) {
      console.warn('Microsoft OAuth not configured');
      return '';
    }

    const params = new URLSearchParams({
      client_id: microsoftConfig.clientId,
      redirect_uri: microsoftConfig.redirectUri,
      response_type: 'code',
      scope: microsoftConfig.scope.join(' '),
      response_mode: 'query'
    });

    return `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params.toString()}`;
  }

  /**
   * Initiate OAuth login flow
   */
  initiateOAuthLogin(provider: 'google' | 'github' | 'microsoft') {
    let authUrl = '';

    switch (provider) {
      case 'google':
        authUrl = this.getGoogleAuthUrl();
        break;
      case 'github':
        authUrl = this.getGitHubAuthUrl();
        break;
      case 'microsoft':
        authUrl = this.getMicrosoftAuthUrl();
        break;
    }

    if (authUrl) {
      window.location.href = authUrl;
    }
  }

  /**
   * Handle OAuth callback and extract authorization code
   */
  getAuthorizationCode(): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get('code');
  }

  /**
   * Get OAuth error from callback
   */
  getOAuthError(): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get('error');
  }

  /**
   * Clear OAuth parameters from URL
   */
  clearOAuthParams() {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

export const oauthService = new OAuthService();
