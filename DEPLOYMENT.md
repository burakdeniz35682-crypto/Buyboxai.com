# buyboxtr.com Deployment Guide

## Prerequisites

1. Node.js 18+ installed
2. MongoDB instance (local or cloud like MongoDB Atlas)
3. Email service credentials (Gmail, SendGrid, etc.)
4. Domain name (for production)

## Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/buyboxtr?retryWrites=true&w=majority

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@buyboxtr.com

# Bank Account Information
BANK_ACCOUNT_NAME=BUYBOX TR TEKNOLOJİ A.Ş.
BANK_IBAN=TR00 0000 0000 0000 0000 0000 00
BANK_NAME=İş Bankası

# Application URLs
NEXT_PUBLIC_APP_URL=https://buyboxtr.com
NEXT_PUBLIC_WHATSAPP_NUMBER=+90 555 123 45 67

# Admin User (for initial setup)
ADMIN_EMAIL=admin@buyboxtr.com
ADMIN_PASSWORD=ChangeThisSecurePassword123!
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (create `.env` file as shown above)

3. Seed the database with initial data:
```bash
npm run seed
```

This will create:
- Admin user
- Sample packages (4 packages)
- Sample categories
- Sample product links

4. Start development server:
```bash
npm run dev
```

5. Access the application:
- Homepage: http://localhost:3000
- User Dashboard: http://localhost:3000/dashboard
- Admin Panel: http://localhost:3000/admin

## Database Seeding

The seed script (`npm run seed`) will populate your database with:

### Default Admin User
- Email: Value from `ADMIN_EMAIL` env variable
- Password: Value from `ADMIN_PASSWORD` env variable

### Packages
1. **Giriş Seviyesi** - 5,000 TL (3 categories)
2. **Profesyonel** - 7,500 TL (6 categories)
3. **Elite** - 11,500 TL (10 categories)
4. **Kurumsal** - 100,000 TL (unlimited categories)

### Sample Categories
- Tişört
- Sweatshirt
- Akıllı Saat
- Telefon Kılıfı
- Laptop
- Ayakkabı
- Çanta
- Kozmetik
- Oyuncak
- Kitap

## Production Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub

2. Import project to Vercel:
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository

3. Configure Environment Variables in Vercel:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`

4. Deploy:
   - Vercel will automatically deploy on every push to main branch

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## Post-Deployment Steps

1. **Create Admin User**:
   - If you haven't run the seed script, create an admin user manually in MongoDB
   - Or run seed script on production database

2. **Configure Email Service**:
   - Set up email service (Gmail App Password, SendGrid API Key, etc.)
   - Test email sending functionality

3. **Update Package Prices**:
   - Login to admin panel
   - Navigate to Packages section
   - Update prices and features as needed

4. **Configure Bank Information**:
   - Update IBAN and bank details in environment variables

5. **Test Order Flow**:
   - Create a test order
   - Verify emails are sent
   - Test admin order management

## Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT secret (min 32 characters)
- [ ] Enable HTTPS in production
- [ ] Configure CORS properly
- [ ] Set up rate limiting for API endpoints
- [ ] Regular database backups
- [ ] Monitor error logs

## MongoDB Atlas Setup (Recommended for Production)

1. Create account at https://mongodb.com/cloud/atlas
2. Create a new cluster (Free tier available)
3. Add database user
4. Whitelist IP addresses (0.0.0.0/0 for development, specific IPs for production)
5. Get connection string and add to `MONGODB_URI`

## Email Configuration

### Gmail Setup
1. Enable 2-factor authentication
2. Generate App Password
3. Use App Password in `EMAIL_PASSWORD` env variable

### SendGrid Setup (Alternative)
1. Create account at sendgrid.com
2. Verify sender email
3. Get API Key
4. Update email service code to use SendGrid API

## Troubleshooting

### Database Connection Issues
- Check MongoDB URI format
- Verify network access (IP whitelist)
- Check database user credentials

### Email Not Sending
- Verify email credentials
- Check spam folder
- Review email service logs
- Test with simple email first

### Admin Login Not Working
- Verify admin user exists in database
- Check if password is hashed correctly
- Clear browser cache and cookies

## Monitoring

### Recommended Tools
- Vercel Analytics (built-in)
- Sentry for error tracking
- MongoDB Atlas monitoring
- Uptime monitoring (UptimeRobot, etc.)

## Backup Strategy

1. **Database Backups**:
   - MongoDB Atlas: Automated daily backups
   - Manual: Use `mongodump` command

2. **Code Backups**:
   - GitHub repository (already versioned)
   - Regular commits and tags

## Scaling Considerations

1. **Database Indexing**:
   - Add indexes on frequently queried fields
   - Monitor slow queries

2. **Caching**:
   - Implement Redis for session management
   - Cache API responses

3. **CDN**:
   - Use Vercel Edge Network (automatic)
   - Or configure separate CDN for static assets

## Support

For issues or questions:
- Check documentation
- Review error logs
- Contact development team

---

**Last Updated**: January 2025
