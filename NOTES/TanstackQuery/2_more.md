> # prefetching in react query

# prefetching


# more
```js
queryKey:["books",a,b]

// whenever a or b changes, it will refetch again, just like dependency array in useEffect hook
```
- `retry` in react-query
- `invalidate.removeQuery`
- `queryClient.setQueryData()` manually invalidating query

# Infinite query