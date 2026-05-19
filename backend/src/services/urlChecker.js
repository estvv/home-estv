const checkUrl = async (url, timeout) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow'
    });

    clearTimeout(timeoutId);
    return response.ok ? 'online' : 'offline';
  } catch (error) {
    clearTimeout(timeoutId);
    return 'offline';
  }
};

module.exports = { checkUrl };
