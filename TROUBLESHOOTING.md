# Guia de Solução de Problemas

## 🔧 Problemas Comuns e Soluções

### 1. Cross-Origin Request Blocked

**Problema:**
```
⚠ Blocked cross-origin request from 192.168.1.3 to /_next/* resource. 
To allow this, configure "allowedDevOrigins" in next.config
```

**Causa:**
O Next.js bloqueia requisições de origens não autorizadas durante o desenvolvimento por segurança.

**Solução:**
Adicione o IP ou domínio à configuração `allowedDevOrigins` no `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'local-origin.dev', 
    '*.local-origin.dev',
    '192.168.1.3',        // IP específico
    '192.168.1.*',        // Range de IPs
    'localhost',
    '127.0.0.1'
  ],
};
```

**IPs Comuns para Desenvolvimento:**
- `localhost` - Acesso local
- `127.0.0.1` - Loopback
- `192.168.1.*` - Rede local comum
- `10.0.0.*` - Rede local alternativa

### 2. Como Descobrir Seu IP Local

**Windows:**
```bash
ipconfig
```

**Mac/Linux:**
```bash
ifconfig
# ou
ip addr
```

**Docker:**
```bash
docker inspect <container_name> | grep IPAddress
```

### 3. Configurações Adicionais Úteis

**Para Desenvolvimento com Docker:**
```typescript
const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    '192.168.1.*',
    '172.17.0.*',  // Docker default network
    '172.18.0.*',  // Docker custom network
  ],
};
```

**Para Desenvolvimento Remoto:**
```typescript
const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    '192.168.1.*',
    '10.0.0.*',
    '*.ngrok.io',  // Se usar ngrok
    '*.tunnel.dev', // Se usar cloudflare tunnel
  ],
};
```

### 4. Reiniciar o Servidor

Após alterar a configuração, sempre reinicie o servidor de desenvolvimento:

```bash
# Parar o servidor (Ctrl+C)
# Depois executar novamente
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

### 5. Verificar se a Configuração Funcionou

1. Reinicie o servidor de desenvolvimento
2. Acesse a aplicação pelo IP configurado
3. Verifique se o aviso não aparece mais no console
4. Teste as funcionalidades da aplicação

### 6. Segurança em Produção

⚠️ **Importante:** A configuração `allowedDevOrigins` só funciona em modo de desenvolvimento. Em produção, o Next.js usa configurações de CORS padrão.

**Para Produção, configure CORS adequadamente:**
```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};
```

## 🚀 Dicas Adicionais

### Desenvolvimento Local
- Use `localhost:3000` quando possível
- Configure seu hosts file se necessário
- Use ferramentas como ngrok para desenvolvimento remoto

### Debugging
- Verifique o console do navegador
- Verifique o terminal do servidor
- Use as ferramentas de desenvolvedor do navegador

### Performance
- A configuração `allowedDevOrigins` não afeta a performance em produção
- Use apenas os IPs necessários para desenvolvimento 