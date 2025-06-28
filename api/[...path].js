export default async function handler(req, res) {
  const { path } = req.query;
  const apiPath = Array.isArray(path) ? path.join('/') : path;
  
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, User-Agent, DNT, Cache-Control, X-Mx-ReqToken, Keep-Alive, X-Requested-With, If-Modified-Since');
  res.setHeader('Access-Control-Max-Age', '86400');

  // OPTIONS 요청 처리 (CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // 백엔드로 요청 프록시
    const backendUrl = `http://15.164.88.35/api/${apiPath}`;
    
    // 요청 헤더 준비
    const headers = {
      'Content-Type': 'application/json',
    };

    // 요청 body 준비
    let body = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = JSON.stringify(req.body);
    }
    
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: headers,
      body: body,
    });

    const data = await response.text();
    
    // 백엔드 응답을 그대로 전달
    res.status(response.status);
    
    // JSON 응답인지 확인
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch {
      res.send(data);
    }
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 