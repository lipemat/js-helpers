/**
 * Delay a promise by a given amount of time.
 *
 * Used to provide enough time to show transitions while
 * other operations are happening.
 *
 * @example ```ts
 *     const delayPromise = delay(200);
 *     // Do another action while waiting for the delay.
 *     await fetchPosts();
 *     await delayPromise;
 *
 * @param  ms The amount of time to delay the promise by.
 *
 * @version 1.0.0
 */
export const delay = ( ms: number ): Promise<void> => {
	return new Promise( resolve => setTimeout( resolve, ms ) );
};
