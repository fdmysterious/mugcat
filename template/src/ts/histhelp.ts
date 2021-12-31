/*************************************
 * Helpers to manage browser history *
 *************************************/
// Florian Dupeyron (floolfy)
// August 2018

export function supported()
{
    return !!(window.history && history.pushState);
}
