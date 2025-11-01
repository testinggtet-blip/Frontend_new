import toast from 'react-hot-toast';

export const isEmailValid = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const domainPart = email.split('@')[1];
  const domainRegex = /^[a-zA-Z]+(\.[a-zA-Z]+)+$/;
  if (
    emailRegex.test(email) &&
    !email.includes('+') &&
    domainRegex.test(domainPart)
  ) {
    return true;
  }
  return false;
};

export const UrlValidation = (inputValue) => {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(inputValue);
};

export const NameValidation = (inputValue) => {
  const regex = /^[a-zA-Z0-9 ]+$/;
  return regex.test(inputValue);
};

export const handleTitleChange = (inputValue) => {
  const regex = /^[a-zA-Z0-9\s ]+$/;
  return regex.test(inputValue);
};

export const MobileNumberValidation = (input) => {
  if (!input.startsWith('+')) {
    return 'Mobile Number Should starts with country code i.e. +1 for US';
  }
  const mobileRegex = /^\+([1-9]{1}[0-9]{0,2})[0-9]{7,11}$/;
  if (!mobileRegex.test(input)) {
    return 'Mobile number is not valid. Use format like +91XXXXXXXXXX';
  }
  return true;
};

export const PasswordValidation = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const formatDateTime = (dateTimeStr, customTimeZone = null) => {
  // Return empty string early when input is null/undefined/empty
  if (dateTimeStr == null || dateTimeStr === '') return '';
  let timeZone;

  // If custom timezone is provided, use it; otherwise fall back to user's timezone
  if (customTimeZone) {
    timeZone = customTimeZone;
  } else {
    try {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      timeZone = userDetails?.timeZone;
    } catch (e) {
      timeZone = undefined;
    }
  }

  // Sanitize timezone: handle null/undefined/invalid or string values like 'null'
  if (
    typeof timeZone !== 'string' ||
    timeZone.trim() === '' ||
    timeZone.toLowerCase?.() === 'null' ||
    timeZone.toLowerCase?.() === 'undefined'
  ) {
    timeZone = undefined;
  } else {
    try {
      // Validate timezone string; fallback if invalid
      // eslint-disable-next-line no-new
      new Intl.DateTimeFormat('en-US', { timeZone });
    } catch (e) {
      timeZone = undefined;
    }
  }

  const dateObj = new Date(dateTimeStr);
  if (isNaN(dateObj.getTime())) return 'Invalid Date';

  // Use Intl.DateTimeFormat for timezone conversion
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: timeZone || undefined,
  };

  // Format: YYYY-MM-DD HH:mm:ss
  const parts = new Intl.DateTimeFormat('en-CA', options).formatToParts(
    dateObj
  );
  const get = (type) => parts.find((p) => p.type === type)?.value || '';
  return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get(
    'minute'
  )}:${get('second')}`;
};

export const DateAndTime = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime()))
    return { date: 'Invalid Date', time: 'Invalid Time' };

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  const formattedDate = `${day} ${month} ${year}`;
  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return `${formattedDate} at ${formattedTime}`;
};

export const formatedDateTime = (dateString) => {
  let timeZone;
  try {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    timeZone = userDetails?.timeZone;
  } catch (e) {
    timeZone = undefined;
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime()))
    return { date: 'Invalid Date', time: 'Invalid Time' };

  // Use Intl.DateTimeFormat for timezone conversion
  const dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: timeZone || undefined,
  };

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: timeZone || undefined,
  };

  const formattedDate = new Intl.DateTimeFormat('en-CA', dateOptions).format(
    date
  );
  const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(
    date
  );

  return { date: formattedDate, time: formattedTime };
};

export const getCurrentDateTimeLocal = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const imageValidation = (file, setErrors, fieldName = 'connectionImage') => {
  const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
  const maxFileSizeMB = 5;
  const fileSizeMB = file.size / 1024 / 1024;

  if (!allowedExtensions.includes(file.type)) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: true,
    }));
    toast.error('Only JPG, JPEG, and PNG files are supported');
    return false;
  }

  if (fileSizeMB > maxFileSizeMB) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: true,
    }));
    toast.error('Image size must be less than 5MB');
    return false;
  }

  setErrors((prevErrors) => ({
    ...prevErrors,
    [fieldName]: false,
  }));
  return true;
};

export const transformSitesResponse = (data) => {
  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    id: item.idsite,
    name: item.name,
    url: item.main_url,
    status: 'active',
  }));
};

export const transformOneSiteResponse = (data) => {
  if (!data || typeof data !== 'object') return null;

  return {
    id: data.idsite,
    name: data.name,
    url: data.main_url,
    status: 'active',
  };
};

export const secondsToHMS = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const transformVisitorStats = (data) => {
  let totalVisits = 0;
  let totalUniqueVisitors = 0;
  let totalPageViews = 0;
  let totalBounceCount = 0;
  let totalVisitLength = 0;
  let countDays = 0;

  for (const day in data) {
    const dayData = data[day];
    if (!dayData || Object.keys(dayData).length === 0) continue;

    totalVisits += dayData.nb_visits || 0;
    totalUniqueVisitors += dayData.nb_uniq_visitors || 0;
    totalPageViews += dayData.nb_actions || 0;
    totalBounceCount += dayData.bounce_count || 0;
    totalVisitLength += dayData.avg_time_on_site || 0;
    countDays++;
  }

  const bounceRate = countDays > 0 ? (totalBounceCount / totalVisits) * 100 : 0;
  const avgTimeInSeconds = countDays > 0 ? totalVisitLength / countDays : 0;
  const avgTimeOnSiteStr = secondsToHMS(avgTimeInSeconds);

  return {
    visitors: totalVisits,
    uniqueVisitors: totalUniqueVisitors,
    pageViews: totalPageViews,
    bounceRate: Number(bounceRate.toFixed(2)),
    avgTimeOnSite: avgTimeOnSiteStr,
    newVsReturning: { new: 0, returning: 0 },
  };
};

export const transformChartData = (data) => {
  const chartData = [];

  for (const date in data) {
    const dayData = data[date];
    if (!dayData || Object.keys(dayData).length === 0) continue;

    chartData.push({
      date,
      visitors: dayData.nb_visits || 0,
      pageViews: dayData.nb_actions || 0,
    });
  }

  return chartData;
};

export const transformPopularPages = (data) => {
  if (typeof data !== 'object' || data === null) return [];

  const allPages = [];

  for (const dailyPages of Object.values(data)) {
    if (!Array.isArray(dailyPages)) continue;

    for (const page of dailyPages) {
      const rawUrl =
        page.segment?.match(/pageUrl=([^$]+)/)?.[1] || page.label || '';
      const decodedUrl = decodeURIComponent(rawUrl)
        .replace(/\^/g, '')
        .replace(/%252F/g, '/');

      allPages.push({
        url: decodedUrl,
        title: page.label || decodedUrl,
        pageViews: page.nb_hits ?? 0,
        uniquePageViews: page.nb_visits ?? 0,
        avgTimeOnPage: secondsToHMS(page.avg_time_on_page ?? 0),
      });
    }
  }

  return allPages;
};

export const transformVisitorLogs = (visits) => {
  if (!Array.isArray(visits)) return [];

  return visits.map((visit) => ({
    visitTime: visit.lastActionDateTime,
    ip: visit.visitIp,
    country: visit.country,
    device: visit.deviceType,
    os: visit.operatingSystem,
    browser: visit.browserName,
    duration: secondsToHMS(visit.visitDuration || 0),
    referrer: visit.referrerName || 'Direct',
    actions: Array.isArray(visit.actionDetails)
      ? visit.actionDetails.map((action) => ({
          url: action.url,
          title: action.pageTitle || 'N/A',
          type: action.type,
          timeSpent: secondsToHMS(action.timeSpent || 0),
        }))
      : [],
  }));
};

export const transformRealTimeVisitors = (visitors) =>
  visitors.map((v) => {
    const firstAction = v.actionDetails?.[0] || {};

    return {
      ip: v.visitIp,
      location: v.location || '',
      browser: v.browser || '',
      os: v.operatingSystem || '',
      time: v.lastActionDateTime || '',
      referrer: v.referrerName || 'Direct',
      action: firstAction.pageTitle || 'Visited a page',
      url: firstAction.url || '',
      pages: Array.isArray(v.actionDetails)
        ? v.actionDetails.map((a) => ({
            url: a.url || '',
            title: a.pageTitle || 'Untitled Page',
            timeSpent: a.timeSpent || 0,
          }))
        : [],
    };
  });
